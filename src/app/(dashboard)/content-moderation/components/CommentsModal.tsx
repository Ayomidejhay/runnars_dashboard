"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

// Mock comments
const mockComments = [
  {
    id: 1,
    author: "Sarah",
    text: "This is so insightful!",
    likes: 2,
    createdAt: "2025-08-14T10:32:00Z",
    replies: [
      {
        id: 11,
        author: "John",
        text: "Totally agree!",
        likes: 1,
        createdAt: "2025-08-14T11:00:00Z",
        replies: [],
      },
    ],
  },
  {
    id: 2,
    author: "Michael",
    text: "Great explanation, thanks for sharing!",
    likes: 0,
    createdAt: "2025-08-13T15:20:00Z",
    replies: [],
  },
];

type Comment = {
  id: number;
  author: string;
  text: string;
  likes: number;
  createdAt: string;
  replies: Comment[];
};

type CommentItemProps = {
  comment: Comment;
  onReply: (comment: Comment) => void;
  onLike: (id: number) => void;
  likedComments: Set<number>;
};

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  onReply,
  onLike,
  likedComments,
}) => {
  const [showReplies, setShowReplies] = useState(true);

  const formattedDate = new Date(comment.createdAt).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="border-b border-gray-200 pb-3 mb-3 flex gap-2">
      <div className="w-8 h-8">
        <Image
          src="/image.png"
          alt="user"
          width={32}
          height={32}
          className="rounded-full"
        />
      </div>

      <div>
        <p className="font-semibold text-sm">{comment.author}</p>
        <p className="text-sm mb-1">{comment.text}</p>
        <p className="text-xs text-gray-400 mb-2">{formattedDate}</p>

        <div className="flex gap-3 text-xs text-gray-500 items-center">
          <button onClick={() => onReply(comment)} className="hover:underline">
            Reply
          </button>
          <button
            onClick={() => onLike(comment.id)}
            disabled={likedComments.has(comment.id)}
            className={`hover:underline ${
              likedComments.has(comment.id)
                ? "text-blue-500 cursor-not-allowed"
                : ""
            }`}
          >
            👍 {comment.likes}
          </button>
          {comment.replies.length > 0 && (
            <button
              onClick={() => setShowReplies((prev) => !prev)}
              className="hover:underline text-gray-600"
            >
              {showReplies
                ? "Hide Replies"
                : `View Replies (${comment.replies.length})`}
            </button>
          )}
        </div>

        {/* Replies (recursive) */}
        {showReplies && comment.replies.length > 0 && (
          <div className="ml-6 mt-2 space-y-2">
            {comment.replies.map((reply) => (
              <CommentItem
                key={reply.id}
                comment={reply}
                onReply={onReply}
                onLike={onLike}
                likedComments={likedComments}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Helper function: add reply recursively at correct nesting level
const addReplyRecursively = (
  comments: Comment[],
  targetId: number,
  newReply: Comment
): Comment[] => {
  return comments.map((c) => {
    if (c.id === targetId) {
      return { ...c, replies: [...c.replies, newReply] };
    }
    return { ...c, replies: addReplyRecursively(c.replies, targetId, newReply) };
  });
};

const CommentsModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [newComment, setNewComment] = useState("");
  const [replyTarget, setReplyTarget] = useState<Comment | null>(null);
  const [mounted, setMounted] = useState(false);
  const [likedComments, setLikedComments] = useState<Set<number>>(new Set());

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = () => {
    if (!newComment.trim()) return;

    const newCommentObj: Comment = {
      id: Date.now(),
      author: "You",
      text: newComment,
      likes: 0,
      createdAt: new Date().toISOString(),
      replies: [],
    };

    if (replyTarget) {
      // Add as nested reply
      setComments((prev) => addReplyRecursively(prev, replyTarget.id, newCommentObj));
    } else {
      // Add as top-level comment
      setComments((prev) => [...prev, newCommentObj]);
    }

    setNewComment("");
    setReplyTarget(null);
  };

  const handleLike = (id: number) => {
    if (likedComments.has(id)) return; // Prevent multiple likes

    const likeRecursively = (list: Comment[]): Comment[] =>
      list.map((c) =>
        c.id === id
          ? { ...c, likes: c.likes + 1 }
          : { ...c, replies: likeRecursively(c.replies) }
      );

    setComments((prev) => likeRecursively(prev));
    setLikedComments((prev) => new Set(prev).add(id));
  };

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black/70 flex justify-end z-50 text-black">
      <div className="bg-white h-screen w-1/2  p-4 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Comments</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900">
            ✖
          </button>
        </div>

        {/* Comments list */}
        <div className="flex-1 overflow-y-auto mb-4">
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onReply={setReplyTarget}
              onLike={handleLike}
              likedComments={likedComments}
            />
          ))}
        </div>

        {/* Replying notice */}
        {replyTarget && (
          <div className="text-sm text-gray-600 mb-2">
            Replying to <span className="font-semibold">{replyTarget.author}</span>
            <button
              className="ml-2 text-red-500 text-xs"
              onClick={() => setReplyTarget(null)}
            >
              Cancel
            </button>
          </div>
        )}

        {/* Input box */}
        <div className="flex items-center gap-2 h-[100px] border-t border-gray-200">
          <input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 border rounded-[100px] p-3 text-sm"
          />
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white p-3 rounded-[100px] text-sm"
          >
            send
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default CommentsModal;
