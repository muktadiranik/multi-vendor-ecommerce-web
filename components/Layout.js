import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <div className='bg-[#feffff]'>
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
