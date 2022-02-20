import Swal from "sweetalert2";

function Newsletter() {
  const handleNewsletterSubmission = async (event) => {
    event.preventDefault();
    const newsletterEmail = event.target[0].value;
    const response = await fetch("/api/newsletter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: newsletterEmail,
      }),
    });

    const data = await response.json();

    if (data.status === 201) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "your email has been added successfully".toUpperCase(),
          showConfirmButton: true,
        });
    } else if (data.status === 406) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "email that you entered is duplicate".toUpperCase(),
          showConfirmButton: true,
        });
    } else {
      throw new Error("wrong method request");
    }
  };

  const newsletterBackground =
    "before:absolute before:inset-0 before:-z-10 before:bg-gradient-to-r before:from-purple-500 before:to-pink-500";

  return (
    <div
      className={
        "relative rounded-xl overflow-hidden shadow-lg space-y-5 mb-20 mt-5 mx-auto shadow-gray-300 py-10 bg-white/10 backdrop-blur-3xl w-[90%] max-w-4xl" +
        " " +
        newsletterBackground
      }
    >
      <h3 className="font-serif text-white/90 font-black md:text-2xl text-lg text-center capitalize">
        subscribe to our newsletter
      </h3>
      <div className="mx-auto">
        <form action="" onSubmit={handleNewsletterSubmission}>
          <div className="rounded-full bg-gray-100 flex w-4/5 max-w-2xl mx-auto pl-5 justify-between">
            <input
              type="text"
              className="outline-none bg-transparent grow"
              placeholder="Enter your email"
              name="newsletter-email"
              id="newsletter-email"
            />
            <button
              className="rounded-full px-5 py-3 text-white bg-black hover:bg-slate-800 transition-colors duration-300"
              type="submit"
            >
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Newsletter;
