const Footer = () => {
  return (
    <footer className="w-full py-4 text-center border-t border-white/20">
      <div>
        문의{" "}
        <a
          href="mailto:playgr5und@gmail.com"
          className="hover:underline hover:text-yellow-300"
        >
          playgr5und@gmail.com
        </a>
      </div>
      <div className="mt-1 text-sm">
        Copyright © 2025 (주)노는 게 제일좋아. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
