import React, { useState } from "react";
import { Box, Heading, Flex, Link, Text } from "rebass";
import { Label, Select } from "@rebass/forms";

const Ajudar = () => {
  return (
    <>
      <Heading>Links para ajudar</Heading>
      <Text>
        <Link
          href="https://www.instagram.com/xoplastico/?hl=pt-br"
          target="_blank"
        >
          Xô, Plastico
        </Link>
      </Text>
      <Text>
        <Link
          href="https://www.kickante.com.br/campanhas/combate-ao-oleo-no-nordeste-do-brasil"
          target="_blank"
        >
          Combate ao óleo no Nordeste do Brasil
        </Link>
      </Text>
      <Text>
        <Link
          href="https://www.vakinha.com.br/vaquinha/salve-o-mar-da-bahia"
          target="_blank"
        >
          Salve o mar da Bahia
        </Link>
      </Text>
      <Text>
        <Link href="https://www.instagram.com/recifesemlixo/" target="_blank">
          recife sem lixo
        </Link>
      </Text>
      <Text>
        <Link href="https://www.atados.com.br/oleononordeste" target="_blank">
          Seja voluntário oleo no nordeste
        </Link>
      </Text>
    </>
  );
};

export default Ajudar;
