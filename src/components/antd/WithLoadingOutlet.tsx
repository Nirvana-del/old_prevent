import React from 'react'
import {Outlet} from "react-router-dom";
import {Spin} from "antd";
import {connect} from "react-redux";

interface WithLoadingOutletProps {
    status?:boolean
}
const WithLoadingOutlet: React.FC<WithLoadingOutletProps> = (props) => {
  const { status } = props
  return (
      <Spin size='large' spinning={status}>
        <Outlet />
      </Spin>
  )
}
const mapStateToProps = (state:any) => {
  const { LoadingState: { status } } = state
  return {
      status
  }
}
export default connect(mapStateToProps)(WithLoadingOutlet)
