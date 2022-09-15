import axios from 'axios';
import { atom, useAtom } from 'jotai';
import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

const searchInputTextAtom = atom<string>('');

const Home: NextPage = ({ data }) => {
  const router = useRouter();
  const [searchInputText, setSearchInputText] = useAtom(searchInputTextAtom);

  const handleChangeSearchText = (text: string) => {
    setSearchInputText(text);
  }

  const handlePressSearch = () => {
    router.push(`?keyword=${searchInputText}`);
  }

  return (
    <div>
      <NextSeo
        title={`Simple Usage Example ${data.items[0].name}`}
        description={`A short description goes here. ${data.total_count}`}
      />
      <div>
        <input type="text" value={searchInputText} onChange={(e) => handleChangeSearchText(e.target.value)} />
        <button type="button" onClick={handlePressSearch}>검색</button>
      </div>
      <div>
        <ul>
          {
            data?.items?.map(item => (
              <li>{item.name}</li>
            ))
          }
        </ul>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  console.log(context.query, '!!!');

  const { data } = await axios.get('https://api.github.com/search/repositories', {
    params: {
      q: context.query?.keyword || 'default'
    }
  });

  return { props: { data } }
}

export default Home;
