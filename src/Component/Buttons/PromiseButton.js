import { Button } from 'antd'
import React from 'react'

export const PromiseButton = ({ typ, title, loading }) => {
    return (
        <Button type="white" loading={loading} className="h-100 py-3 w-100">{title}</Button>
    )
}
