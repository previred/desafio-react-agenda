import { FC, ReactElement } from "react"
import { Input } from "antd"

import { useUsersContext } from "../context"

export const FilterResults: FC = (): ReactElement => {
    const { fetchQuery } = useUsersContext()

    return (
        <Input.Search
            placeholder="input search text"
            style={{ margin: '24px 0'}}
            allowClear
            // click on search icon / click on clear icon / press Enter
            onSearch={value => fetchQuery(value)}

        />
    )
}
