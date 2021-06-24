import {
  Box,
  Divider,
  Modal,
  ModalHeader,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalOverlay,
  UnorderedList,
} from "@chakra-ui/react";
import { FormEventHandler, useCallback, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Result } from "./Result";
import { SearchInput } from "./SearchInput";

export interface SearchModalProps {
  inputValue: string;
  isOpen: boolean;
  onClose: () => void;
  onInputChange: (s: string) => void;
  submodules: { name: string; to: string }[];
}

export function SearchModal({
  inputValue,
  isOpen,
  onClose,
  onInputChange,
  submodules,
}: SearchModalProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { push } = useHistory();

  const navigate = useCallback(
    (to: string) => {
      push(to);
      onClose();
    },
    [onClose, push]
  );

  const onSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    (e) => {
      e.preventDefault();

      if (!submodules.length) return;
      const { to } = submodules[0];
      navigate(to);
    },
    [navigate, submodules]
  );

  return (
    <Modal initialFocusRef={inputRef} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay>
        <ModalContent mx={4}>
          <ModalCloseButton data-testid="choose-submodule-modal-close" />
          <ModalHeader
            data-testid="choose-submodule-modal-header"
            fontSize="lg"
            fontWeight="bold"
          >
            Choose a submodule
          </ModalHeader>
          <ModalBody data-testid="choose-submodule-modal-body" p={0}>
            <Box pb={4} px={4}>
              <SearchInput
                onChange={onInputChange}
                onSubmit={onSubmit}
                ref={inputRef}
                value={inputValue}
              />
            </Box>
            <Divider bg="blue.100" />
            <UnorderedList
              data-testid="choose-submodule-modal-results"
              m={0}
              maxH="50vh"
              overflow="hidden auto"
              p={0}
              role="listbox"
              tabIndex={-1}
            >
              {submodules.map(({ name, to }) => (
                <Result key={name} name={name} onClick={() => navigate(to)} />
              ))}
            </UnorderedList>
          </ModalBody>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
}
