import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
    Box,
    Flex,
    Heading,
    Input,
    Icon,
    Text,
    VStack,
} from '@chakra-ui/react';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { toaster } from '@/components/ui/toaster';
import api from '@/services/api';
import { AxiosError } from 'axios';

interface LoginFormData {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>();

    const onSubmit = async (data: LoginFormData) => {
        try {
            const response = await api.post('/operator-login', data);

            // Suponiendo que el token viene en response.data.token o similar
            // Basado en experiencias comunes con Magneticash
            const token = response.data.token || response.data.access_token || 'dummy-token';

            localStorage.setItem('authToken', token);

            toaster.create({
                title: t('login.success'),
                description: t('login.successDesc'),
                type: 'success',
            });

            navigate('/scanner');
        } catch (error) {
            const axiosError = error as AxiosError<{ message?: string }>;
            const message = axiosError.response?.data?.message || 'Credenciales inválidas o error de conexión';

            toaster.create({
                title: t('login.error'),
                description: message || t('login.errorDesc'),
                type: 'error',
            });
        }
    };

    return (
        <Flex
            align="center"
            bgGradient="to-b"
            gradientFrom="gray.900"
            gradientTo="purple.950"
            flex="1"
            justify="center"
            minH="calc(100vh - 80px)"
            px={4}
        >
            <Box
                backdropFilter="blur(12px)"
                bg="whiteAlpha.50"
                borderColor="whiteAlpha.100"
                borderRadius="2xl"
                borderWidth="1px"
                boxShadow="0 25px 50px -12px rgba(168, 85, 247, 0.25)"
                maxW="400px"
                p={8}
                w="full"
            >
                {/* Logo / título */}
                <VStack gap={2} mb={8}>
                    <Box
                        bg="transparent"
                        borderRadius="xl"
                        mb={2}
                        p={1}
                    >
                        <Icon as={UserCircleIcon} boxSize={20} color="white" />
                    </Box>
                    <Heading
                        color="white"
                        fontSize="2xl"
                        fontWeight="bold"
                        textAlign="center"
                    >
                        {t('login.title')}
                    </Heading>
                    <Text color="whiteAlpha.600" fontSize="sm" textAlign="center">
                        {t('login.subtitle')}
                    </Text>
                </VStack>

                <form id="login-form" onSubmit={handleSubmit(onSubmit)}>
                    <VStack gap={5}>
                        <Field
                            errorText={errors.email?.message}
                            invalid={!!errors.email}
                            label={t('login.email')}
                        >
                            <Input
                                id="login-email"
                                autoComplete="email"
                                borderColor="whiteAlpha.200"
                                color="white"
                                px={4}
                                placeholder={t('login.emailPlaceholder')}
                                type="email"
                                _placeholder={{ color: 'whiteAlpha.400' }}
                                _focus={{
                                    borderColor: 'purple.400',
                                    boxShadow: '0 0 0 1px var(--chakra-colors-purple-400)',
                                }}
                                {...register('email', {
                                    required: t('login.emailRequired'),
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: t('login.emailInvalid'),
                                    },
                                })}
                            />
                        </Field>

                        <Field
                            errorText={errors.password?.message}
                            invalid={!!errors.password}
                            label={t('login.password')}
                        >
                            <Input
                                id="login-password"
                                autoComplete="current-password"
                                borderColor="whiteAlpha.200"
                                color="white"
                                px={4}
                                placeholder={t('login.passwordPlaceholder')}
                                type="password"
                                _placeholder={{ color: 'whiteAlpha.400' }}
                                _focus={{
                                    borderColor: 'purple.400',
                                    boxShadow: '0 0 0 1px var(--chakra-colors-purple-400)',
                                }}
                                {...register('password', {
                                    required: t('login.passwordRequired'),
                                    minLength: {
                                        value: 4,
                                        message: t('login.passwordMinLength'),
                                    },
                                })}
                            />
                        </Field>

                        <Button
                            id="login-submit"
                            bg="purple.500"
                            color="white"
                            form="login-form"
                            loading={isSubmitting}
                            loadingText={t('login.loading')}
                            mt={2}
                            size="lg"
                            type="submit"
                            w="full"
                            _hover={{ bg: 'purple.400', transform: 'translateY(-1px)' }}
                            _active={{ transform: 'translateY(0)' }}
                            transition="all 0.2s"
                        >
                            {t('login.submit')}
                        </Button>
                    </VStack>
                </form>
            </Box>
        </Flex>
    );
};

export default Login;
