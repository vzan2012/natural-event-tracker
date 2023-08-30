import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";
import classes from "./LocationInfo.module.css";

const LocationInfo = ({ info }) => {
  return (
    <Card>
      <CardHeader>
        <Heading size="md">Event Location Info</Heading>
      </CardHeader>
      <CardBody>
        <UnorderedList>
          <ListItem>
            <strong>Id:</strong>
            <span>{info.id}</span>
          </ListItem>
          <ListItem>
            <strong>Title:</strong>
            <span>{info.title}</span>
          </ListItem>
        </UnorderedList>
      </CardBody>
    </Card>
  );
};

export default LocationInfo;
