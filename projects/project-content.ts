const PROJECTS = [
  {
    id: "proj1",
    title: "Sorting Algorithm Visualizer",
    description:
      "Visual implementation of Merge Sort, Bubble Sort, Quick Sort, and Shell Sort.",
    technologies: "JavaScript (ES6), React.js, CSS, Git",
    route: "/sorting-visualizer-project",
  },
  {
    id: "proj2",
    title: "Dig Dug Arcade Game Clone",
    description:
      "Recreated version of Namco's 1982 Dig Dug game. Still a work in progress but getting close to done.",
    technologies: "TyeScript, Next.js, CSS, Git",
    route: "/dig-dug-project",
  },
  {
    id: "proj3",
    title: "Binary Search Tree Optimizer",
    description:
      "A top-down dynamic algorithim to find optimal binary search trees.",
    technologies: "Java",
    route: "https://github.com/liamliam2020/BSTOptimizer",
  }, 
  {
    id: "proj4",
    title: "Memory Allocator",
    description:
      "An implementation of Malloc and Free using a worst fit scheme.",
    technologies: "C, Make",
    route: "https://github.com/liamliam2020/MemoryAllocator",
  }
  // {
  //   id: "proj3",
  //   title: "Spotify Music Interpolator",
  //   description:
  //     "Integration with Spotify's API to pull fun info out of any song you want to search. https://developer.spotify.com/documentation/web-api/quick-start/",
  //   technologies: "GoLang, TyeScript, Next.js, CSS, Git",
  //   route: "embedded in project",
  // },
  // {
  //   id: "proj4",
  //   title: "Compiler LOL",
  //   description:
  //     "If you're into a little bit of lower level check out a Compiler I've been working on!",
  //   technologies: "idk yet maybe C or Rust?",
  //   route: "embedded in project",
  // },
];

export function getAllProjects() {
  return PROJECTS;
}
