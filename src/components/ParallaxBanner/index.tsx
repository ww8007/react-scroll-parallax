import React, { PropsWithChildren } from 'react';
import { Parallax } from '../Parallax';
import { ParallaxBannerProps } from './types';

const containerStyle = {
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
  height: '50vh',
};

const absoluteStyle = {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};

export const ParallaxBanner = ({
  children,
  className,
  layers,
  style,
  disabled,
}: PropsWithChildren<ParallaxBannerProps>) => {
  return (
    <div
      style={{ ...containerStyle, ...style }}
      className={'parallax-banner' + (className ? ` ${className}` : '')}
    >
      {layers.map(
        (
          {
            amount,
            children: layerChildren,
            expanded = true,
            image,
            props = {},
          },
          i
        ) => {
          // save props to be merged
          const layerStyle = props.style || {};
          const layerClass = props.className || '';

          // remove from pass through props
          delete props.style;
          delete props.className;

          const layerClassMerged = `parallax-banner-layer-${i}${
            layerClass ? ` ${layerClass}` : ''
          }`;

          // if this is an expanded layer overwrite the top/bottom styles with negative margins
          const expandedStyle = expanded
            ? {
                top: Math.abs(amount) * 100 * -1 + '%',
                bottom: Math.abs(amount) * 100 * -1 + '%',
              }
            : {};
          // optional image styles
          const imageStyle = image
            ? {
                backgroundImage: `url(${image})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              }
            : {};

          return (
            <Parallax
              key={`layer-${i}`}
              translateY={[amount * -1 * 100 + '%', amount * 100 + '%']}
              styleInner={absoluteStyle}
              styleOuter={absoluteStyle}
              disabled={disabled}
            >
              <div
                className={layerClassMerged}
                style={{
                  ...imageStyle,
                  ...absoluteStyle,
                  ...expandedStyle,
                  ...layerStyle,
                }}
                {...props}
              >
                {layerChildren}
              </div>
            </Parallax>
          );
        }
      )}
      {children}
    </div>
  );
};

ParallaxBanner.defaultProps = {
  disabled: false,
};