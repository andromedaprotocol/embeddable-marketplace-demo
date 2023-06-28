import { useAppUtils } from "@/lib/app/hooks";
import { IBaseCollection } from "@/lib/app/types";
import { LINKS } from "@/utils/links";
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

interface CollectionDropdownProps { }
const CollectionDropdown: FC<CollectionDropdownProps> = (props) => {
  const { getCollections } = useAppUtils();

  const collections = useMemo(() => {
    return getCollections() as IBaseCollection[];
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
              <CollectionLinkItem name={col.name} />
            </MenuItem>
          </Link>
        ))}
      </MenuList>
    </Menu>
  );
};

interface CollectionLinkItemProps {
  name: string;
}
const CollectionLinkItem: FC<CollectionLinkItemProps> = (props) => {
  const { name } = props;

  return <Text>{name}</Text>;
};

export default CollectionDropdown;
