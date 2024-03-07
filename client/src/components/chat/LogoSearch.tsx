import "./chatCss/LogoSearch.css"


const LogoSearch: React.FC = () => {
  return (
    <>   
      <div className="LogoSearch  px-4 py-4">
      <div className="Search">
          <input type="text" placeholder="User Name"/>
          <div className="simpleButton1 p-1">
           Search
          </div>
      </div>
    </div>
    </>
  );
};
export default LogoSearch;
