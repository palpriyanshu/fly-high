import React from "react";
import locale from "../../locale/en.json";
import NavigationButton from "../../components/button/NavigationButton";
import ErrorComponent from "../../components/error-component/ErrorComponent";

const PageNotFound : React.FC = () => {
    return <ErrorComponent
        title={locale.PAGE_NOT_FOUND_TITLE}
        description={locale.PAGE_NOT_FOUND_DESCRIPTION}
        ActionComponent={() => <NavigationButton path="/" label={locale.HOME_PAGE_BUTTON}/>}
    />;
};

export default PageNotFound;