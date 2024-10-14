import React from "react";
import Tippy from "@tippyjs/react";
const CustomTippy = ({ children, content, SearchTippy, seeMore, Login }) => {
  return (
    <>
      {seeMore && (
        <Tippy
          content={content}
          interactive={true}
          placement="bottom"
          delay={[0, 0]}
        >
          {children}
        </Tippy>
      )}
      {SearchTippy && (
        <Tippy
          content={content}
          interactive={true}
          placement="bottom"
          trigger="focus"
        >
          {children}
        </Tippy>
      )}
      {Login && (
        <Tippy content={content} interactive={true} placement="bottom">
          {children}
        </Tippy>
      )}
    </>
  );
};

export default CustomTippy;
