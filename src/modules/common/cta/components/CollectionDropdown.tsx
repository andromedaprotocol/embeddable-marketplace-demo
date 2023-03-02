import { useAppUtils } from "@/lib/app/hooks";
import {
  useGetCollection,
  useGetTokenFromColId,
} from "@/lib/graphql/hooks/collection";
import { LINKS } from "@/utils/links";
import { truncate } from "@/utils/text";
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import React, { FC, useMemo } from "react";

interface CollectionDropdownProps {}
const CollectionDropdown: FC<CollectionDropdownProps> = (props) => {
  const {} = props;
  const { getCollections } = useAppUtils();

  const collections = useMemo(() => {
    return getCollections();
  }, [getCollections]);

  return (
    <Menu>
      <MenuButton
        as={Button}
        variant="ghost"
        fontSize="sm"
        rightIcon={<ChevronDown width={16} />}
      >
        Collections
      </MenuButton>
      <MenuList>
        {collections.map((col) => (
          <Link key={col.id} href={LINKS.collection(col.id)} passHref>
            <MenuItem as="a" key={col.id}>
              <CollectionLinkItem colId={col.id} />
            </MenuItem>
          </Link>
        ))}
      </MenuList>
    </Menu>
  );
};

interface CollectionLinkItemProps {
  colId: string;
}
const CollectionLinkItem: FC<CollectionLinkItemProps> = (props) => {
  const { colId } = props;
  const { data: collection } = useGetCollection(colId);

  return <Text>{collection?.contractInfo?.name ?? colId}</Text>;
};

export default CollectionDropdown;
