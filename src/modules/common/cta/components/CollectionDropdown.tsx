import { LINKS } from "@/utils/links";
import { COLLECTIONS } from "@/utils/seed";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import React, { FC } from "react";

interface CollectionDropdownProps {}
const CollectionDropdown: FC<CollectionDropdownProps> = (props) => {
  const {} = props;

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
        {COLLECTIONS.map((collection) => (
          <Link
            key={collection.id}
            href={LINKS.collection(collection.slug)}
            passHref
          >
            <MenuItem as="a" key={collection.id}>
              {collection.name}
            </MenuItem>
          </Link>
        ))}
      </MenuList>
    </Menu>
  );
};
export default CollectionDropdown;
