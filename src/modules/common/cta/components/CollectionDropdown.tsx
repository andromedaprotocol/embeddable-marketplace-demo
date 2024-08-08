"use client";
import { useAppUtils } from "@/lib/app/hooks";
import useApp from "@/lib/app/hooks/useApp";
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
  const { config } = useApp();
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
        data-testid="collection-dropdown-button"
      >
        Collections
      </MenuButton>
      <MenuList data-testid="collection-dropdown-list">
        {collections.map((col) => (
          <MenuItem
            as={Link}
            href={LINKS.collection(col.id)}
            key={col.id}
            data-testid={`collection-dropdown-item-${col.id}`}
          >
            <CollectionLinkItem name={col.name} />
          </MenuItem>
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

  return <Text data-testid="collection-link-item-name">{name}</Text>;
};

export default CollectionDropdown;
