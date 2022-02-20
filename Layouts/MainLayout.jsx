import Navbar from "../Components/Navbar";
import Newsletter from "../Components/Newsletter";

function MainLayout({ children }) {
  return (
    <>
      <style jsx global>
        {`
          body {
            background: rgb(219 234 254 / 0.2);
          }
        `}
      </style>
      <Navbar />
      <main>{children}</main>
      <section>
        <Newsletter />
      </section>
    </>
  );
}

export default MainLayout;
