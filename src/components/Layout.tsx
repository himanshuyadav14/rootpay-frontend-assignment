import React from 'react';
import illustrationSrc from '../assets/illustration.svg';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    /* ── Page: dark navy background ── */
    <div
      className="min-h-screen w-full flex items-center justify-center p-6 lg:p-10"
      style={{ backgroundColor: '#0F1B3C' }}
    >
      {/* ── Big grey container ── */}
      <div
        className="w-full max-w-[1100px] rounded-2xl flex overflow-hidden shadow-2xl"
        style={{ backgroundColor: '#F3F4F6', minHeight: '620px' }}
      >
        {/* ── Left: grey, text + illustration ── */}
        <div
          className="hidden lg:flex lg:w-[48%] flex-col justify-between p-12 xl:p-14"
          style={{ backgroundColor: '#F3F4F6' }}
        >
          {/* Text */}
          <div>
            <p className="text-gray-400 text-sm font-medium mb-2 tracking-wide">
              Let's get started
            </p>
            <h1 className="text-gray-900 text-[2rem] font-bold leading-tight mb-3">
              Create your account
            </h1>
            <p className="text-gray-500 text-sm leading-relaxed">
              Follow the steps to create your account
            </p>
          </div>

          {/* Illustration */}
          <div className="flex-1 flex items-end justify-center mt-6 pb-2">
            <img
              src={illustrationSrc}
              alt="Person using payment app"
              className="w-full max-w-[360px] select-none"
              draggable={false}
            />
          </div>
        </div>

        {/* ── Right: grey bg + white card filling full height ── */}
        <div
          className="flex-1 flex items-stretch p-6 sm:p-8 xl:p-10"
          style={{ backgroundColor: '#F3F4F6' }}
        >
          {/* White card - full height of right panel, no border */}
          <div
            className="w-full rounded-2xl bg-white p-8 sm:p-10 flex flex-col"
            style={{
              boxShadow: '0 8px 32px 0 rgba(0,0,0,0.12), 0 2px 8px 0 rgba(0,0,0,0.06)',
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
