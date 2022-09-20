import SoftBox from "components/SoftBox";
import PropTypes from "prop-types";

const Layout = ({children}) => {

    return (
      <SoftBox
        height='100vh'
        width= '100vw'
        p={2}
        // style={{ height: '100%', left: '0px', width: '100%', overflow: 'hidden'}}
      >
        {children}
      </SoftBox>
    );
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;