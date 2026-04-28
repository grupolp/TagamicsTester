import { Box, Icon, IconButton, Input, type InputProps } from '@chakra-ui/react';
import * as React from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

export interface PasswordInputProps extends InputProps {
    rootProps?: any;
}

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
    function PasswordInput(props, ref) {
        const { rootProps, ...rest } = props;
        const [show, setShow] = React.useState(false);

        return (
            <Box position="relative" width="full" {...rootProps}>
                <Input
                    ref={ref}
                    type={show ? 'text' : 'password'}
                    paddingEnd="10"
                    {...rest}
                />
                <IconButton
                    aria-label={show ? 'Hide password' : 'Show password'}
                    onClick={() => setShow(!show)}
                    position="absolute"
                    right="1"
                    top="50%"
                    transform="translateY(-50%)"
                    variant="ghost"
                    size="sm"
                    color="whiteAlpha.600"
                    _hover={{ color: 'white', bg: 'transparent' }}
                    zIndex={2}
                >
                    <Icon as={show ? EyeSlashIcon : EyeIcon} />
                </IconButton>
            </Box>
        );
    }
);
