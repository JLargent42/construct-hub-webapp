import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { Card } from "../Card";

export interface PackageHeaderProps {
  title: string;
  description: string;
  tags: string[];
}

export const PackageHeader: FunctionComponent<PackageHeaderProps> = ({
  description,
  tags,
  title,
}) => {
  return (
    <Card as={Flex} direction="column" p={2}>
      <Box mb={5}>
        <Heading>{title}</Heading>
      </Box>

      <Box>
        <Text>{description}</Text>
      </Box>

      {!!tags.length && (
        <Flex direction="row" mt={3}>
          {tags.map((tag) => (
            <Flex
              bg="gray.100"
              borderRadius="sm"
              justify="center"
              key={tag}
              mr={4}
              p={2}
            >
              <Text>{tag.toUpperCase()}</Text>
            </Flex>
          ))}
        </Flex>
      )}
    </Card>
  );
};