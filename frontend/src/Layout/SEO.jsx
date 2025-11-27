import { HelmetProvider } from "react-helmet-async";

const SEO = ({ title, description, keywords }) => {
    return(
        <HelmetProvider>
            <title>{title ? title : "Eco Mart"}</title>
            {description && (
                <meta name='description' content={description} />
            )}

            {keywords && (
                <meta name="keywords" content={keywords} />
            )}
        </HelmetProvider>
    )
}

export default SEO