# SheetStream

**Client Site Hosted Link**: [SheetStream on Vercel](https://vercel.ssd)  
**Server Repository**: [SheetStream Server on GitHub](https://github.com/tigermursa/SheetStream_Server)

## About the Project

SheetStream allows users to write blog posts in familiar environments like MS Word or Google Sheets, saving their content as `.docx` files. Users can then upload these files through an intuitive interface and manage their blogs without any need for coding. Once uploaded, the content can be easily edited and customized to fit the desired format and style for publication.

### Key Features:

- **File Upload**: Upload `.docx` files written in MS Word or Google Sheets to the platform.
- **Edit Dashboard**: Once uploaded, you can modify the content using a built-in editor, adjusting the format and style before publishing.
- **Image Management**: Upload up to two images from your local machine to enhance your blog posts.
- **Custom Titles & Descriptions**: Add a blog title and a short description to complete your post.
- **Easy Updates**: Not happy with how it looks? You can always revisit and update your post through the edit dashboard.

## Technologies Used

### Frontend:

- **Next.js 14**: Provides the foundation for server-side rendering and a responsive frontend.
- **Tailwind CSS**: Enables rapid and responsive UI design.
- **SWR & Next.js API Routes**: For efficient data fetching and server-client communication.
- **React Hook Form**: Simplifies form handling for user inputs.
- **React Icons**: Adds a variety of icons to enhance the UI.
- **React Toastify**: Displays notifications for user interactions.
- **Cloudinary**: Manages image uploads to streamline the media handling process.
- **React Quill**: Rich text editor used for customizing blog content.

### Backend:

- **Express.js**: Powers the backend logic and API routes.
- **TypeScript**: Ensures strong typing and error checking.
- **Mongoose**: Facilitates database interactions with MongoDB.
- **Mammoth**: Converts `.docx` files into HTML for easier content manipulation.
- **Multer**: Handles file uploads to the server.

## Project Timeline

This project was developed over three days, from September 10 to September 12. Refactoring and optimization are ongoing to enhance performance and usability.


## Build Structure

Route (app)                               Size     First Load JS
┌ ƒ /                                     2.35 kB         106 kB
├ ○ /_not-found                           137 B          87.5 kB
├ ○ /blogs                                280 B          99.4 kB
├ ● /blogs/[...id]                        386 B          92.8 kB
├ ○ /edit                                 176 B          94.3 kB
├ ƒ /edit/[...id]                         11.8 kB         115 kB
└ ○ /upload                               1.24 kB        99.4 kB
+ First Load JS shared by all             87.3 kB
  ├ chunks/23-3f0b21b86839fda7.js         31.6 kB
  ├ chunks/fd9d1056-dece9939c5280cc6.js   53.6 kB
  └ other shared chunks (total)           2.14 kB

Route (pages)                             Size     First Load JS
─ ○ /Upload/UploadingPage                 7.17 kB        86.3 kB
+ First Load JS shared by all             79.1 kB
  ├ chunks/framework-bd7ad8ec63c6466b.js  44.8 kB
  ├ chunks/main-a65a2876b21a7016.js       32.2 kB
  └ other shared chunks (total)           2.11 kB

○  (Static)   prerendered as static content
●  (SSG)      prerendered as static HTML (uses getStaticProps)
ƒ  (Dynamic)  server-rendered on demandd