import photo from '../images/phone.gif';

const Home = () => {
  return (
    <section className="w-full h-full flex flex-col justify-center items-center pt-10">
      <h1>
        Your
        <span className=" container mx-auto table uppercase text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-lime-900">
          phonebook
        </span>
      </h1>
      <p className=" container mx-auto text-center text-md">
        Add, find, delete contacts when and where it's convenient for you.
      </p>
      <div className="hidden md:block mx-auto w-[780px] h-[520px]">
        <iframe
          src={photo}
          title="phone"
          className=" w-[100%] h-[500px]"
          allowFullScreen
        ></iframe>
      </div>
    </section>
  );
};

export default Home;
