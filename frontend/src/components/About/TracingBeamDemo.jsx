import React from "react";
import { TracingBeam } from "./TracingBeam";

export function TracingBeamDemo() {
  return (
    <TracingBeam className="px-6">
      <div className="max-w-2xl mx-auto antialiased pt-4 relative">
        {dummyContent.map((item, index) => (
          <div key={`content-${index}`} className="mb-10">
            <h2 className="bg-black text-white rounded-full text-sm w-fit px-4 py-1 mb-4">
              {item.badge}
            </h2>

            <p className="text-xl font-semibold text-white mb-4">
              {item.title}
            </p>

            <div className="text-sm prose prose-sm prose-invert text-gray-300">
              {item?.image && (
                <img
                  src={item.image}
                  alt="blog thumbnail"
                  height="1000"
                  width="1000"
                  className="rounded-lg mb-10 object-cover"
                />
              )}
              {item.description}
            </div>
          </div>
        ))}
      </div>
    </TracingBeam>
  );
}

const dummyContent = [
  {
    title: "Lorem Ipsum Dolor Sit Amet",
    description: (
      <>
        <p>
          Sit duis est minim proident non nisi velit non consectetur. Esse
          adipisicing laboris consectetur enim ipsum reprehenderit eu deserunt
          Lorem ut aliqua anim do. Duis cupidatat qui irure cupidatat incididunt
          incididunt enim magna id est qui sunt fugiat.
        </p>
        <p>
          Dolor minim irure ut Lorem proident. Ipsum do pariatur est ad ad
          veniam in commodo id reprehenderit adipisicing. Proident duis
          exercitation ad quis ex cupidatat cupidatat occaecat adipisicing.
        </p>
      </>
    ),
    badge: "React",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=3540&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Exercitation ad quis cupidatat",
    description: (
      <>
        <p>
          Enim cillum dolor et nulla sunt exercitation non voluptate qui
          aliquip esse tempor. Ullamco ut sunt consectetur sint qui qui do do
          qui do. Labore laborum culpa magna reprehenderit ea velit id esse
          adipisicing deserunt amet dolore.
        </p>
      </>
    ),
    badge: "Changelog",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=3540&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Tempor quis dolor veniam quis dolor",
    description: (
      <>
        <p>
          Sit reprehenderit eiusmod reprehenderit deserunt amet laborum
          consequat adipisicing officia qui irure id sint adipisicing.
          Adipisicing fugiat aliqua nulla nostrud. Amet culpa officia aliquip
          deserunt veniam deserunt officia adipisicing.
        </p>
      </>
    ),
    badge: "Launch Week",
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=3506&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];
