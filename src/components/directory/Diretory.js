import React from "react";
import './Diretory.scss';
import MenuItem from "../menu-item/MenuItem";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {selectDirectorySection} from "../../redux/directory/directory.selectors";

const Directory = ({ section }) => (
  <div className="directory-menu">
    { section.map(({id, ...otherSectionProps}) => (
      <MenuItem
        key={id}
        { ...otherSectionProps }
      />
    ))}
  </div>
);

const mapStateToProps = createStructuredSelector({
  section: selectDirectorySection
});

export default connect(mapStateToProps)(Directory);