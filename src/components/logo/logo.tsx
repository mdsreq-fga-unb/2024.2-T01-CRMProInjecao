'use client';

import { forwardRef } from 'react';
// @mui
import Link from '@mui/material/Link';
import Box, { BoxProps } from '@mui/material/Box';
// routes
import { RouterLink } from '@/routes/components';
import Image from 'next/image';
import { useTheme } from '@mui/material';

// ----------------------------------------------------------------------

export interface LogoProps extends BoxProps {
  disabledLink?: boolean;
}

const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({ disabledLink = false, sx, ...other }, ref) => {
    const theme = useTheme();

    const logo = (
      <Box
        ref={ref}
        component="div"
        sx={{
          width: 70,
          height: 70,
          display: 'inline-flex',
          backgroundColor: theme.palette.mode === 'light' ? theme.palette.grey[600] : null,
          borderRadius: 4,
          ...sx,
        }}
        {...other}
      >
        <Image src="/logo-vetor.png" alt="logo" width={70} height={70} />
      </Box>
    );

    if (disabledLink) {
      return logo;
    }

    return (
      <Link component={RouterLink} href="/" sx={{ display: 'contents' }}>
        {logo}
      </Link>
    );
  }
);

export default Logo;
