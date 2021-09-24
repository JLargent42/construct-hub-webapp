import { Box, Divider, Flex } from "@chakra-ui/react";
import { FunctionComponent, useEffect } from "react";
import { CatalogSearch } from "../../components/CatalogSearch";
import { PackageList } from "../../components/PackageList";
import { Page } from "../../components/Page";
import { Language } from "../../constants/languages";
import { QUERY_PARAMS } from "../../constants/url";
import { useCardView } from "../../contexts/CardView";
import { useCatalogSearch } from "../../hooks/useCatalogSearch";
import { usePagination } from "../../hooks/usePagination";
import { useQueryParams } from "../../hooks/useQueryParams";
import { getSearchPath } from "../../util/url";
import { PageControls } from "../SearchResults/components/PageControls";
import { ShowingDetails } from "../SearchResults/components/ShowingDetails";
import { LIMIT, SearchQueryParam } from "../SearchResults/constants";
import { useSearchAPI } from "./SearchAPI";

const toNum = (val: string) => {
  const result = parseInt(val);

  if (`${result}` === "NaN") {
    return 0;
  }

  return result;
};

export const SearchResults: FunctionComponent = () => {
  const { cardView, CardViewControls } = useCardView();
  const queryParams = useQueryParams();
  const { results, search } = useSearchAPI();

  const searchQuery = decodeURIComponent(
    queryParams.get(QUERY_PARAMS.SEARCH_QUERY) ?? ""
  );

  const languageQuery = queryParams.get(
    QUERY_PARAMS.LANGUAGE
  ) as Language | null;

  const searchAPI = useCatalogSearch({
    defaultQuery: searchQuery,
    defaultLanguage: languageQuery,
  });

  const offset = toNum(queryParams.get(QUERY_PARAMS.OFFSET) ?? "0");

  const { page, pageLimit } = usePagination(results, { offset, limit: LIMIT });

  const getUrl = (
    params: Partial<{ [key in SearchQueryParam]: number | string }>
  ) => {
    return getSearchPath({
      query: (params.q ?? searchQuery) as string,
      language: languageQuery,
      offset: params.offset ?? offset,
    });
  };

  useEffect(() => {
    search({
      query: searchQuery,
      filters: { language: languageQuery ?? undefined },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageQuery, searchQuery]);

  useEffect(() => {
    // Reflect changes to queryParam to search input (specifically for tag clicks)
    if (searchQuery !== searchAPI.query) {
      searchAPI.setQuery(searchQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  return (
    <Page
      meta={{
        title: searchQuery || "Search",
        description: searchQuery
          ? `${results.length} results for ${searchQuery} at Construct Hub`
          : "Search reusable components for your cloud application",
      }}
      pageName="search"
    >
      <Flex direction="column" maxW="100vw">
        <Box p={4}>
          <CatalogSearch {...searchAPI} />
        </Box>
        <Divider />
        <Box p={4}>
          <Flex justify="space-between" pb={4}>
            <ShowingDetails
              count={results.length}
              filtered={!!searchQuery}
              limit={LIMIT}
              offset={offset}
            />
            <CardViewControls />
          </Flex>
          <PackageList cardView={cardView} items={page} />
          <PageControls
            getPageUrl={getUrl}
            limit={LIMIT}
            offset={offset}
            pageLimit={pageLimit}
          />
        </Box>
      </Flex>
    </Page>
  );
};
