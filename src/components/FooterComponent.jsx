const FooterComponent = () => {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <footer className="">
        <p>Copyright ⓒ {currentYear}</p>
      </footer>
    </>
  );
};
export default FooterComponent;
