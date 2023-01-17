import React from 'react'
// import { connect } from 'react-redux'
import {Outlet} from "react-router-dom";
import {Spin} from "antd";

interface WithLoadingOutletProps {
  loading?:boolean
}
const WithLoadingOutlet: React.FC<WithLoadingOutletProps> = (props) => {
  // const { loading } = props
  const loading = false
  return (
      <Spin size='large' spinning={loading}>
        <Outlet />
      </Spin>
  )
}
// const mapStateToProps = (state:any) => {
//   const { LoadingReducer: { loading } } = state
//   return {
//     loading
//   }
// }
// export default connect(mapStateToProps)(WithLoadingOutlet)
export default WithLoadingOutlet