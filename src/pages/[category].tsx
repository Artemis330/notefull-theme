import { GetStaticPaths, GetStaticProps } from "next"
import { ParsedUrlQuery } from "querystring"

import type { CategoryInfoType } from "@typing/category"
import type { MetaType } from "@typing/post/meta"
import type { SeriesType } from "@typing/post/series"
import type { PageType } from "@typing/page"

import {
    getAllCategoryPath,
    getSingleCategoryInfo,
} from "@core/loader/category"

import {
    getAllSeries,
    getSpecificCategoryMeta,
    getSpecificCategoryLatestMeta,
    getUniqueTagFromMeta,
} from "@core/loader/post"

import { CategorySEO } from "@components/SEO"
import { Banner, PostLinkLayer } from "@components/_common"
import { ColorTitle } from "@components/_atoms"
import { SeriesViewer } from "@components/_pages/category"

interface ParamQuery extends ParsedUrlQuery {
    category: string
}

export const getStaticProps: GetStaticProps<CategoryPageProps> = async ({
    params,
}) => {
    const { category } = params as ParamQuery

    const specificCategoryMeta = await getSpecificCategoryMeta(category)
    const latestCategoryPostMeta =
        getSpecificCategoryLatestMeta(specificCategoryMeta)
    const latestCategoryPostTag = getUniqueTagFromMeta(specificCategoryMeta)

    const categorySeries = getAllSeries(specificCategoryMeta)

    const categoryInfo = await getSingleCategoryInfo(category)

    return {
        props: {
            latestPost: latestCategoryPostMeta,
            latestTag: latestCategoryPostTag,
            allSeries: categorySeries,
            ...categoryInfo,
        },
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const allCategoryPath = await getAllCategoryPath()
    return {
        paths: allCategoryPath,
        fallback: false,
    }
}

interface CategoryPageProps extends CategoryInfoType {
    latestPost: MetaType[]
    latestTag: string[]
    allSeries: SeriesType[]
}
function CategoryPage(props: CategoryPageProps) {
    const {
        latestPost,
        allSeries,
        category,
        categoryUrl,
        description,
        color,
        emoji,
    } = props

    const isSeriesExsist = allSeries.length !== 0
    return (
        <>
            <CategorySEO {...props} />

            <Banner title={category} description={description} hex={color} />

            {isSeriesExsist && (
                <>
                    <ColorTitle title="Series" size="text-3xl" hex={color} />
                    <SeriesViewer allSeriesInfo={allSeries} color={color} />
                </>
            )}

            <ColorTitle
                title="Read More"
                size="text-3xl"
                hex={color}
                href={`/${category}/1`}
            />
            <PostLinkLayer postMetaArray={latestPost} />
        </>
    )
}
CategoryPage.displayName = "Category" as PageType
export default CategoryPage
