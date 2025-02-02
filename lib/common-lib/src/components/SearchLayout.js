import React from 'react'
import { Box, Center, HStack, Stack, Input } from 'native-base'
import { useWindowSize } from './helper'
import IconByName from './IconByName'
import { useNavigate } from 'react-router-dom'

export default function SearchLayout({
  filters,
  minStringLength,
  notFoundMessage,
  imageUrl,
  children,
  search,
  setSearch,
  onCloseSearch
}) {
  const [width, Height] = useWindowSize()
  const [refSearchBar, setRefSearchBar] = React.useState({})
  const navigate = useNavigate()

  return (
    <Center>
      <Box minH={Height} w={width}>
        <Stack
          width={'100%'}
          style={{
            backgroundImage: 'url(' + imageUrl + ')',
            backgroundColor: 'transparent',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
          }}
          space={5}
          ref={(e) => setRefSearchBar(e)}
        >
          <HStack bg='white' space='1' alignItems='center' p='5'>
            <IconByName
              size='sm'
              name='ArrowLeftLineIcon'
              color='primary.500'
              onPress={(e) => {
                if (onCloseSearch) {
                  onCloseSearch()
                } else {
                  navigate(-1)
                }
              }}
            />
            <Input
              flex='1'
              variant='unstyled'
              InputRightElement={
                <React.Fragment>
                  <IconByName
                    _icon={{ size: '23' }}
                    color='coolGray.500'
                    w='1/8'
                    name='MicLineIcon'
                    pl='0'
                    onPress={(e) => console.log('not found mic fuction')}
                  />
                </React.Fragment>
              }
              placeholder={`Type ${
                minStringLength ? 'min ' + minStringLength : ''
              } to search `}
              onChange={(e) => setSearch(e.target.value)}
            />
          </HStack>
        </Stack>
        {search && (!minStringLength || search.length >= minStringLength) ? (
          children
        ) : (
          <Center
            minH={
              Height -
              (refSearchBar?.clientHeight ? refSearchBar?.clientHeight : 79)
            }
            w={width}
          >
            <Stack space='10' alignItems='center'>
              <IconByName
                _icon={{ size: '100' }}
                color='coolGray.200'
                w='1/8'
                name='FileSearchLineIcon'
                pl='0'
                onPress={(e) => setSearchInput(false)}
              />
              <Box _text={{ color: 'coolGray.300' }}>{notFoundMessage}</Box>
            </Stack>
          </Center>
        )}
      </Box>
    </Center>
  )
}
