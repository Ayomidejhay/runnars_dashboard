// "use client";

// import React, { useEffect, useMemo, useState } from "react";
// import { postMockData } from "@/mockdata";
// import Image from "next/image";
// import { Search } from "lucide-react";
// import { createPortal } from "react-dom";
// import CommentsModal from "../../content-moderation/components/CommentsModal";

// type MenuPos = { top: number; left: number };

// const PostDetails = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [openRow, setOpenRow] = useState<number | null>(null);
//   const [menuPos, setMenuPos] = useState<MenuPos | null>(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [showCommentsModal, setShowCommentsModal] = useState(false);

//   const MENU_WIDTH = 160;
//   const MENU_GAP = 8;

//   // Filter posts
//   const filteredPost = useMemo(() => {
//     return postMockData.filter((post) => {
//       const title = post.title?.toLowerCase() || "";
//       const username = post.username?.toLowerCase() || "";

//       return (
//         title.includes(searchTerm.toLowerCase()) ||
//         username.includes(searchTerm.toLowerCase())
//       );
//     });
//   }, [searchTerm]);

//   // Pagination
//   const totalPages = Math.ceil(filteredPost.length / rowsPerPage);
//   const paginatedPost = filteredPost.slice(
//     (currentPage - 1) * rowsPerPage,
//     currentPage * rowsPerPage
//   );

//   // Close dropdown on outside click, ESC, scroll, resize
//   useEffect(() => {
//     if (openRow === null) return;

//     const onDocClick = (e: MouseEvent) => {
//       const menu = document.getElementById("row-actions-menu");
//       if (menu && !menu.contains(e.target as Node)) {
//         setOpenRow(null);
//       }
//     };

//     const onEsc = (e: KeyboardEvent) => {
//       if (e.key === "Escape") setOpenRow(null);
//     };

//     const onScrollOrResize = () => setOpenRow(null);

//     document.addEventListener("mousedown", onDocClick);
//     window.addEventListener("keydown", onEsc);
//     window.addEventListener("scroll", onScrollOrResize, true);
//     window.addEventListener("resize", onScrollOrResize);

//     return () => {
//       document.removeEventListener("mousedown", onDocClick);
//       window.removeEventListener("keydown", onEsc);
//       window.removeEventListener("scroll", onScrollOrResize, true);
//       window.removeEventListener("resize", onScrollOrResize);
//     };
//   }, [openRow]);

//   // calculate menu position
//   const openMenuForTarget = (
//     evt: React.MouseEvent<HTMLButtonElement, MouseEvent>,
//     id: number
//   ) => {
//     const rect = evt.currentTarget.getBoundingClientRect();
//     const tentativeLeft = rect.right - MENU_WIDTH;
//     const left = Math.max(
//       8,
//       Math.min(tentativeLeft, window.innerWidth - MENU_WIDTH - 8)
//     );
//     const top = rect.bottom + MENU_GAP;
//     setMenuPos({ top, left });
//     setOpenRow((prev) => (prev === id ? null : id));
//   };

//   return (
//     <div className="bg-white p-4 rounded mt-6">
//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <h2 className="text-lg font-semibold text-gray-800 capitalize">
//           All Posts ({postMockData.length})
//         </h2>
//         <div className="relative h-10 rounded-[32px]">
//           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
//           <input
//             type="text"
//             placeholder="Search post..."
//             value={searchTerm}
//             onChange={(e) => {
//               setSearchTerm(e.target.value);
//               setCurrentPage(1);
//             }}
//             className="pl-10 pr-4 py-2 border rounded-[32px] w-[240px] text-sm"
//           />
//         </div>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto mt-4">
//        <table className="w-full text-sm text-left border-collapse">
//   <thead>
//     <tr className="bg-tableheader text-tableheadertext text-xs uppercase">
//       <th className="px-4 py-3 font-medium">Post</th>
//       <th className="px-4 py-3 font-medium">User</th>
//       <th className="px-4 py-3 font-medium">Engagements</th>
//       <th className="px-4 py-3 font-medium text-center">Actions</th>
//     </tr>
//   </thead>

//   <tbody className="divide-y divide-gray-200">
//     {paginatedPost.length > 0 ? (
//       paginatedPost.map((post) => {
//         const idNum = Number(post.id);
//         return (
//           <tr
//             key={post.id}
//             className="hover:bg-gray-50 transition-colors"
//           >
//             {/* Post Info */}
//             <td className="px-4 py-4 align-top">
//               <div className="flex flex-col gap-1">
//                 <p className="font-medium text-sm text-deepblue truncate max-w-[220px]">
//                   {post.title}
//                 </p>
//                 <p className="text-xs text-gray-500">
//                   Posted:{" "}
//                   {new Date(post.time).toLocaleString("en-US", {
//                     month: "short",
//                     day: "numeric",
//                     hour: "numeric",
//                     minute: "2-digit",
//                     hour12: true,
//                   })}{" "}
//                   • {post.type}
//                 </p>
//                 <p className="text-xs text-brightblue truncate">
//                   {post.hashtags}
//                 </p>
//               </div>
//             </td>

//             {/* User */}
//             <td className="px-4 py-4 align-top">
//               <div className="flex items-center gap-2">
//                 <Image src="/image.png" alt="user" width={32} height={32} className="rounded-full" />
//                 <div className="flex flex-col">
//                   <p className="text-sm text-deepblue font-bold">
//                     {post.username}
//                   </p>
//                   <p className="text-xs text-gray-500">
//                     @sarahj • Max (Golden Retriever)
//                   </p>
//                 </div>
//               </div>
//             </td>

//             {/* Progress */}
//             <td className="px-4 py-4 align-top text-sm text-deepblue">
//               <p>42 Likes</p>
//               <p>12 Comments</p>
//               <p>{post.repostCount} Reposts</p>
//             </td>

//             {/* Actions */}
//             <td className="px-4 py-4 text-center">
//               <button
//                 onClick={(e) => openMenuForTarget(e, idNum)}
//                 aria-haspopup="menu"
//                 aria-expanded={openRow === idNum}
//               >
//                 <Image
//                   src="/Button-table.svg"
//                   alt="actions"
//                   width={20}
//                   height={20}
//                   className="cursor-pointer"
//                 />
//               </button>
//             </td>
//           </tr>
//         );
//       })
//     ) : (
//       <tr>
//         <td
//           colSpan={4}
//           className="text-center py-8 text-gray-500"
//         >
//           {postMockData.length === 0
//             ? "No post yet."
//             : "No matching results."}
//         </td>
//       </tr>
//     )}
//   </tbody>
// </table>

//       </div>

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div className="flex justify-between items-center mt-4">
//           <div className="flex gap-2 items-center">
//             <label className="text-sm text-gray-600">Rows per page:</label>
//             <select
//               value={rowsPerPage}
//               onChange={(e) => {
//                 setRowsPerPage(Number(e.target.value));
//                 setCurrentPage(1);
//               }}
//               className="text-sm font-bold text-deepblue px-2 py-1"
//             >
//               {[5, 10, 20, 50].map((num) => (
//                 <option key={num} value={num}>
//                   {num}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="flex gap-2 items-center">
//             <button
//               onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
//               disabled={currentPage === 1}
//             >
//               <Image src="/prev.svg" alt="prev" height={32} width={32} />
//             </button>
//             <span className="text-sm">
//               Page {currentPage} of {totalPages}
//             </span>
//             <button
//               onClick={() =>
//                 setCurrentPage((p) => Math.min(p + 1, totalPages))
//               }
//               disabled={currentPage === totalPages}
//             >
//               <Image src="/next.svg" alt="next" height={32} width={32} />
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Dropdown Menu */}
//       {openRow !== null &&
//         menuPos &&
//         createPortal(
//           <div
//             id="row-actions-menu"
//             role="menu"
//             style={{
//               top: menuPos.top,
//               left: menuPos.left,
//               position: "fixed",
//             }}
//             className="w-40 bg-white shadow-lg rounded-md z-[9999] border"
//           >
//             <button
//               onClick={() => {
//                 setShowCommentsModal(true);
//                 setOpenRow(null);
//               }}
//               className="w-full text-left px-4 py-2 text-sm flex gap-2 items-center hover:bg-gray-50"
//             >
//               <Image src="/eye.svg" alt="icon" width={20} height={20} />
//               See comments
//             </button>
//             <button className="w-full text-left px-4 py-2 text-sm text-red-600 flex gap-2 items-center hover:bg-gray-50">
//               <Image src="/edit.svg" alt="icon" width={20} height={20} />
//               Flag post
//             </button>
//             <button className="w-full text-left px-4 py-2 text-sm text-red-600 flex gap-2 items-center hover:bg-gray-50">
//               <Image src="/user.svg" alt="icon" width={20} height={20} />
//               Delete post
//             </button>
//           </div>,
//           document.body
//         )}

//       {/* Comments Modal */}
//       {showCommentsModal && (
//         <CommentsModal onClose={() => setShowCommentsModal(false)} />
//       )}
//     </div>
//   );
// };

// export default PostDetails;

"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import { createPortal } from "react-dom";
import CommentsModal from "../../content-moderation/components/CommentsModal";
import { useChallengePosts } from "@/hooks/useAnalyticsChallenge";
import { useParams } from "next/navigation";

type MenuPos = { top: number; left: number };

const PostDetails = () => {
  //   const params = useParams();
  //   const challengeId = params.challengeId as string;
  const { id } = useParams();

  const [searchTerm, setSearchTerm] = useState("");
  const [openRow, setOpenRow] = useState<string | null>(null);
  const [menuPos, setMenuPos] = useState<MenuPos | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showCommentsModal, setShowCommentsModal] = useState(false);

  const MENU_WIDTH = 160;
  const MENU_GAP = 8;

  // ✅ Fetch posts
  const { data, isLoading, isError } = useChallengePosts(id as any, {
    page: currentPage,
    limit: rowsPerPage,
  });

  const posts = data?.data?.posts ?? [];
  const pagination = data?.data?.pagination;

  const totalPages = pagination?.totalPages ?? 1;
  const totalPosts = pagination?.totalPosts ?? 0;

  // Client-side search filter
  const filteredPost = useMemo(() => {
    return posts.filter((post: any) => {
      const content = post.content?.toLowerCase() || "";
      const username = post.author?.username?.toLowerCase() || "";
      return (
        content.includes(searchTerm.toLowerCase()) ||
        username.includes(searchTerm.toLowerCase())
      );
    });
  }, [posts, searchTerm]);

  // Close dropdown logic
  useEffect(() => {
    if (!openRow) return;

    const onDocClick = (e: MouseEvent) => {
      const menu = document.getElementById("row-actions-menu");
      if (menu && !menu.contains(e.target as Node)) setOpenRow(null);
    };

    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && setOpenRow(null);
    const onScrollOrResize = () => setOpenRow(null);

    document.addEventListener("mousedown", onDocClick);
    window.addEventListener("keydown", onEsc);
    window.addEventListener("scroll", onScrollOrResize, true);
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      document.removeEventListener("mousedown", onDocClick);
      window.removeEventListener("keydown", onEsc);
      window.removeEventListener("scroll", onScrollOrResize, true);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [openRow]);

  // Dropdown positioning
  const openMenuForTarget = (
    evt: React.MouseEvent<HTMLButtonElement>,
    id: string,
  ) => {
    const rect = evt.currentTarget.getBoundingClientRect();
    const tentativeLeft = rect.right - MENU_WIDTH;
    const left = Math.max(
      8,
      Math.min(tentativeLeft, window.innerWidth - MENU_WIDTH - 8),
    );
    const top = rect.bottom + MENU_GAP;

    setMenuPos({ top, left });
    setOpenRow((prev) => (prev === id ? null : id));
  };

  return (
    <div className="bg-white p-4 rounded mt-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800 capitalize">
          All Posts ({totalPosts})
        </h2>

        <div className="relative h-10 rounded-[32px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search post..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-[32px] w-[240px] text-sm"
          />
        </div>
      </div>

      {/* Loading / Error */}
      {isLoading && <p className="py-6 text-gray-500">Loading posts...</p>}
      {isError && <p className="py-6 text-red-500">Failed to load posts</p>}

      {/* Table */}
      {!isLoading && (
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="bg-tableheader text-tableheadertext text-xs uppercase">
                <th className="px-4 py-3">Post</th>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Engagements</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {filteredPost.length > 0 ? (
                filteredPost.map((post: any) => (
                  <tr key={post._id} className="hover:bg-gray-50">
                    {/* Post Info */}
                    <td className="px-4 py-4 align-top">
                      <p className="font-medium text-sm truncate max-w-[220px]">
                        {post.content}
                      </p>

                      <p className="text-xs text-gray-500">
                        Posted: {new Date(post.createdAt).toLocaleString()}
                        {" • "}
                        {post.challenge?.type}
                      </p>

                      {/* <p className="text-xs text-blue-500 truncate">
                        {post.hashtags?.join(" ")}
                      </p> */}
                      <p className="text-xs text-blue-500 truncate">
                        {post.hashtags
                          ?.map((tag: string) =>
                            tag.startsWith("#") ? tag : `#${tag}`,
                          )
                          .join(" ")}
                      </p>
                     

                    </td>

                    {/* User */}
                    <td className="px-4 py-4 align-top">
                      <div className="flex items-center gap-2">
                        <Image
                          src={post.author?.profilePicture || "/image.png"}
                          alt="user"
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                        <div>
                          <p className="text-sm font-bold">
                            {post.author?.username}
                          </p>
                          <p className="text-xs text-gray-500">
                            {post.author?.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Engagement */}
                    <td className="px-4 py-4">
                      <p>{post.engagement.likesCount} Likes</p>
                      <p>{post.engagement.commentsCount} Comments</p>
                      <p>{post.engagement.repostsCount} Reposts</p>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-4 text-center">
                      <button onClick={(e) => openMenuForTarget(e, post._id)}>
                        <Image
                          src="/Button-table.svg"
                          alt="actions"
                          width={20}
                          height={20}
                        />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-gray-500">
                    No posts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4">
          <div className="flex gap-2 items-center">
            <span className="text-sm">Rows per page:</span>
            <select
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="text-sm font-bold px-2 py-1"
            >
              {[5, 10, 20, 50].map((num) => (
                <option key={num}>{num}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-2 items-center">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
            >
              <Image src="/prev.svg" alt="prev" height={32} width={32} />
            </button>

            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <Image src="/next.svg" alt="next" height={32} width={32} />
            </button>
          </div>
        </div>
      )}

      {/* Dropdown Menu */}
      {openRow &&
        menuPos &&
        createPortal(
          <div
            id="row-actions-menu"
            style={{ top: menuPos.top, left: menuPos.left, position: "fixed" }}
            className="w-40 bg-white shadow-lg rounded-md z-[9999] border"
          >
            <button
              onClick={() => {
                setShowCommentsModal(true);
                setOpenRow(null);
              }}
              className="w-full px-4 py-2 text-sm hover:bg-gray-50 flex gap-2"
            >
              <Image src="/eye.svg" alt="" width={20} height={20} />
              See comments
            </button>

            <button className="w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-50 flex gap-2">
              <Image src="/edit.svg" alt="" width={20} height={20} />
              Flag post
            </button>

            <button className="w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-50 flex gap-2">
              <Image src="/user.svg" alt="" width={20} height={20} />
              Delete post
            </button>
          </div>,
          document.body,
        )}

      {/* Comments Modal */}
      {showCommentsModal && (
        <CommentsModal onClose={() => setShowCommentsModal(false)} />
      )}
    </div>
  );
};

export default PostDetails;
