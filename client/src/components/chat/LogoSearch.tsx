import "./chatCss/LogoSearch.css"


const LogoSearch: React.FC = () => {
  return (
    <>   
      <div className="LogoSearch px-5 py-4">
      <div className="Search">
          <input type="text" placeholder="#Explore"/>
          <div className="simpleButton1 p-1">
           Search
          </div>
      </div>
    </div>
    </>
  );
};
export default LogoSearch;
