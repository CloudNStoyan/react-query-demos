import { useQuery } from "@tanstack/react-query";
import type { JSX } from "react";
import { Link, useParams } from "react-router-dom";

export const ReactRouterTestDemo = (): JSX.Element => {
  const { pageId } = useParams();

  const pageIdAsNumber = Number(pageId);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["api/data", pageIdAsNumber],
    queryFn: async ({ signal }) => {
      const resp = await fetch("http://localhost:3001/api/test-endpoint", {
        signal,
      });

      if (!resp.ok) {
        throw new Error("response was not ok");
      }

      const respData = await resp.text();

      return respData;
    },
  });

  return (
    <div className="flex flex-col gap-5">
      {isFetching && <div>fetching data...</div>}
      {isLoading && <div>loading data...</div>}
      {data && <div>the server returned {data}</div>}
      <div className="flex gap-5">
        {pageIdAsNumber > 1 && (
          <Link to={`/demo-2/${pageIdAsNumber - 1}`}>
            Previous - {pageIdAsNumber - 1}
          </Link>
        )}
        <Link to={`/demo-2/${pageIdAsNumber + 1}`}>
          Next - {pageIdAsNumber + 1}
        </Link>
      </div>
    </div>
  );
};
