import "../css/Loader.css";

const Loader: React.FC = () => {
  return (
    <>
      <div className="parent container-fluid">
        <div className="wrapper">
          <div className="circle" />
          <div className="circle" />
          <div className="circle" />
          <div className="shadow" />
          <div className="shadow" />
          <div className="shadow" />
        </div>
      </div>
    </>
  );
};

export default Loader;
