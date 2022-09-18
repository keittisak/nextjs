import SoftBox from "components/SoftBox";
import PropTypes from "prop-types";

const Layout = ({children}) => {

    return (
      <SoftBox
        sx={({ breakpoints, transitions, functions: { pxToRem } }) => ({
          p: 3,
          position: "relative",
        })}
        style={{ height: '100%', position: 'absolute', left: '0px', width: '100%', overflow: 'hidden'}}
      >
        {children}
      </SoftBox>
    );
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;