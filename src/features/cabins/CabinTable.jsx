import { useSearchParams } from "react-router-dom";

import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";

import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";

export default function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("discount") || "all";
  const filteredCabins =
    filterValue === "no-discount"
      ? cabins.filter((cabin) => cabin.discount === 0)
      : filterValue === "with-discount"
      ? cabins.filter((cabin) => cabin.discount > 0)
      : filterValue === "all"
      ? cabins
      : [];

  const sortBy = searchParams.get("sortBy") || "name-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins?.sort((a, b) =>
    typeof a[field] === "string"
      ? a[field].localeCompare(b[field]) * modifier
      : (a[field] - b[field]) * modifier
  );

  if (isLoading) return <Spinner />;

  if (!cabins.length) return <Empty resource="cabins" />;

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}
