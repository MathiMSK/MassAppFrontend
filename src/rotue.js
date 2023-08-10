import UploadVideo from "./header/upload";
import RecipeReviewCard from "./pages/Home/video";
import {HiHome} from 'react-icons/hi'
import {FaCloudUploadAlt} from 'react-icons/fa'
import {BiSolidUserAccount} from 'react-icons/bi'
import {HiChatBubbleBottomCenterText} from 'react-icons/hi2'
import MyAccount from "./pages/profile/myAccount";
import Chat from "./pages/chat";

const routes=[
        { path: "/", name: "Home", element:<RecipeReviewCard/> ,icon:<HiHome/>},
        { path: "/upload", name: "Upload", element:<UploadVideo/> ,icon:<FaCloudUploadAlt/> },
        { path: "/MyAccount", name: "My Account", element:<MyAccount/> ,icon:<BiSolidUserAccount/> },
        { path: "/chat", name: "Chat", element:<Chat/> ,icon:<HiChatBubbleBottomCenterText/> }
]

export default routes;