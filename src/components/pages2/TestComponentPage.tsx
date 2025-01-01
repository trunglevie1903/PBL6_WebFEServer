import React, { CSSProperties } from "react";
// import LogoAndName from "../subComponent/LogoAndName";
// import LinkToUpload from "../subComponent/LinkToUpload";
// import HeaderLeftSection from "../subComponent/HeaderLeftSection";
// import UserSearchBox from "../subComponent/UserSearchBox";
import LinkToRegister from "../subComponent/LinkToRegister";
import LinkToLogin from "../subComponent/LinkToLogin";
// import ProfileDropdown from "../subComponent/ProfileDropdown";
// import HeaderRightSection from "../subComponent/HeaderRightSection";
// import Header from "../subComponent/Header";
// import {Header, HeaderLeftSection, LogoAndName, LinkToUpload, SearchBox, LinkToSignUp, LinkToSignIn, UnauthorizedOptions, HeaderRightSection, MyAccountOption, SignOutOption, DropdownLabel, AuthorizedOptions} from "../subComp2/Header";
import { AuthProvider } from "../../contexts/AuthContext";
// import { DefaultVideoCard, Thumbnail, Title } from "../subComp2/DefaultVideoCard";
// import { SidebarVideoCard } from "../subComp2/SidebarVideoCard";
// import { CommentCard, CommentText, ReplyForm } from "../subComp2/CommentCard";
import { WatchVideoSection } from "../subComp2/bigComponents/WatchVideoSection";
import { ManageMyProfile } from "../subComp2/bigComponents/ManageMyProfile";

const TestComponentPage: React.FC = () => {
  const styles: {[key: string]: CSSProperties} = {
    wrapper: {
      width: "100%",
      height: "auto",
      padding: "5rem 0",
      backgroundColor: "#f8f1e4",
      // padding: 'auto',
      // display: "flex",
      // flexDirection: "row",
      // justifyContent: "space-between",
      // alignItems: "center",
    }
  }
  return (
    <AuthProvider>
      <div style={styles.wrapper}>
        {/* <LogoAndName /> */}
        {/* <LinkToUpload /> */}
        {/* <HeaderLeftSection /> */}
        {/* <UserSearchBox /> */}
        {/* <LinkToRegister /> */}
        {/* <LinkToLogin /> */}
        {/* <ProfileDropdown /> */}
        {/* <HeaderRightSection /> */}
        {/* <Header /> */}

        {/* <LogoAndName /> */}
        {/* <LinkToUpload /> */}
        {/* <HeaderLeftSection /> */}
        {/* <SearchBox /> */}
        {/* <LinkToSignUp /> */}
        {/* <LinkToSignIn /> */}
        {/* <UnauthorizedOptions /> */}
        {/* <MyAccountOption /> */}
        {/* <SignOutOption /> */}
        {/* <DropdownLabel /> */}
        {/* <AuthorizedOptions /> */}
        {/* <HeaderRightSection /> */}
        {/* <Header /> */}

        {/* <Thumbnail img={null}/> */}
        {/* <Title str={null} /> */}
        {/* <DefaultVideoCard videoId={null}/> */}
        {/* <SidebarVideoCard videoId={null} /> */}
        {/* <ReplyForm /> */}
        {/* <CommentText str={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, iure similique illum nisi natus, quis non odio facilis vel doloremque iste ipsam consequatur quaerat repudiandae beatae enim iusto sunt at aspernatur delectus. Asperiores atque numquam harum aliquid! Laboriosam ab commodi, adipisci deleniti dolore excepturi repudiandae ea consequatur dolorem totam vitae quam nam voluptatum, aut illo expedita, sint velit odio suscipit deserunt. Eius fugit temporibus aperiam. Est provident ullam iusto, ut, voluptate commodi dolorem pariatur debitis excepturi atque assumenda corporis eveniet ipsam error alias inventore corrupti eos nam voluptatibus architecto aliquam sapiente aut accusamus. Labore natus odio ipsam qui sequi odit."} /> */}
        {/* <CommentCard commentId={null}/> */}
        {/* <VideoReactSection videoId={""}/> */}
        {/* <VideoBasicInformation /> */}
        {/* <VideoMediaCard videoId={null} /> */}
        {/* <VideoCard /> */}
        {/* <OtherVideoSectionHeader /> */}
        {/* <OtherVideoSectionItem videoId={null} /> */}
        {/* <OtherVideoSectionList videoIds={[]} /> */}
        {/* <OtherVideoSection videoId={null} /> */}
        {/* <WatchVideoSection /> */}
        {/* <NavbarOptionList /> */}
        <ManageMyProfile username={null} />
      </div>
    </AuthProvider>
  );
};

export default TestComponentPage;
// Watch user's profile
// Setting my profile (read, update)
// Upload video
// Watch video (include CRUD comments, like/dislike video)
// Setting my uploaded video (read, update, delete)
// Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, iure similique illum nisi natus, quis non odio facilis vel doloremque iste ipsam consequatur quaerat repudiandae beatae enim iusto sunt at aspernatur delectus. Asperiores atque numquam harum aliquid! Laboriosam ab commodi, adipisci deleniti dolore excepturi repudiandae ea consequatur dolorem totam vitae quam nam voluptatum, aut illo expedita, sint velit odio suscipit deserunt. Eius fugit temporibus aperiam. Est provident ullam iusto, ut, voluptate commodi dolorem pariatur debitis excepturi atque assumenda corporis eveniet ipsam error alias inventore corrupti eos nam voluptatibus architecto aliquam sapiente aut accusamus. Labore natus odio ipsam qui sequi odit.