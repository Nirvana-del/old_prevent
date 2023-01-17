import React from 'react'
import {Button} from "antd";

const activeConfig = {
      style: {
          boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.2)',
          color: '#fff',
          borderRadius: 8,
          backgroundColor: '#1677FF',
      },
      title: '活动标题，可配置图片',
      subTitle: '活动介绍说明文字',
      action: (
          <Button
              size="large"
              style={{
                  borderRadius: 20,
                  background: '#fff',
                  color: '#1677FF',
                  width: 120,
              }}
          >
              去看看
          </Button>
      )
  }
export default activeConfig