import React from 'react'
import OldUser from "@/pages/Home/OldUser";
import FmUser from "@/pages/Home/FmUser";
import {RoleMap} from "@/types/user";
import {useAuthContext} from "@/components/hooks/useAuthContext";
import AdminUser from "@/pages/Home/AdminUser";

const Home: React.FC = () => {
    const {userInfo:{roleType}} = useAuthContext()
    return (
        <>
            {
                roleType === RoleMap.OLD && (<> <OldUser /></>)
            }
            {
                roleType === RoleMap.FAMILY && (<> <FmUser /></>)
            }
            {
                roleType === RoleMap.ADMIN && (<> <AdminUser /></>)
            }
        </>

    )
}
export default Home