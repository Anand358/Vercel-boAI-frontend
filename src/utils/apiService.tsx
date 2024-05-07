// import axios from "axios";

// axios.interceptors.request.use(
//   (config) => {
//     // Check if the URL contains the workspace ID
//     const workspaceBaseEndpoint = `/workspaces/${
//       import.meta.env.VITE_WORKSPACEID
//     }`;
//     const isInWorkspaceEndpoint = config.url.includes(workspaceBaseEndpoint);

//     // Append conversationId only if the URL does not belong to any workspace endpoints
//     if (
//       conversationId &&
//       !isInWorkspaceEndpoint && // Exclude any endpoint that includes /workspaces/{WORKSPACEID}
//       !config.url.includes("/profile") &&
//       !config.url.includes("/create_content_director") &&
//       !config.url.includes("/get_screenplay") &&
//       !config.url.includes("/create_videofactory") &&
//       !config.url.includes("/create_video")
//     ) {
//       config.url += `/${conversationId}`;
//     }

//     // Specific URL replacements for screenplayId, if needed
//     if (screenplayId) {
//       if (config.url.includes("/get_screenplay")) {
//         config.url = config.url.replace(
//           /\/get_screenplay\/([^/]+)/,
//           `/get_screenplay/${screenplayId}`
//         );
//       }
//       if (config.url.includes("/create_videofactory")) {
//         config.url = config.url.replace(
//           /\/create_videofactory\/([^/]+)/,
//           `/create_videofactory/${screenplayId}`
//         );
//       }
//     }

//     // Adjusting for lineupId where necessary
//     if (lineupId && config.url.includes("/create_video")) {
//       config.url = config.url.replace(
//         /\/create_video\/([^/]+)/,
//         `/create_video/${lineupId}`
//       );
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default axios;
