import React from "react";

const routes = [
  {
    path: "/home", title: 'Home', component: React.lazy(() => import("@@/pages/home/Home.js")), exact: true,
  },
  {
    path: "/aboutme", title: 'About Me', component: React.lazy(() => import("@@/pages/aboutme/AboutMe.js")), exact: true,
  },
  {
    path: "/projects", title: 'Projects', component: React.lazy(() => import("@@/pages/projects/Project.js")), exact: true,
  },
  {
    path: "/blogs", title: 'Blogs', component: React.lazy(() => import("@@/pages/blog/Blog.js")), exact: true,
  },
  {
    path: "/testimonial", title: 'Testimonial', component: React.lazy(() => import("@@/pages/testimonial/Testimonial.js")), exact: true,
  }
];
export default routes;