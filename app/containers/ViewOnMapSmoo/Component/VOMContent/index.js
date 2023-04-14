import React from 'react';
import HotelContent from './HotelContent';
import {
  StyledIframe,
  StyledListWrapper,
  StyledMapWrapper,
} from './styleCustom';
export default function VOMContent() {
  return (
    <StyledMapWrapper>
      <StyledIframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59527.303617694386!2d106.077636!3d21.174018000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31350c5b3464ae51%3A0x1a3035b9749102f9!2zVHAuIELhuq9jIE5pbmgsIELhuq9jIE5pbmg!5e0!3m2!1svi!2s!4v1651206885082!5m2!1svi!2s"
        allowFullScreen
        loading="lazy"
        title="Map"
        frameBorder={0}
      />
      <StyledListWrapper>
        <HotelContent />
      </StyledListWrapper>
    </StyledMapWrapper>
  );
}
