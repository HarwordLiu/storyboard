import OSS from 'ali-oss';

const client = new OSS({
  region: 'oss-cn-beijing',
  accessKeyId: 'LTAI5tFyuNqEzBTQ9g5cAAQM',
  accessKeySecret: 'XF9f4vkh6boMECfjcv7uVkM9bWCJSQ',
  bucket: 'harwordliu-storyboard',
});

async function list() {
  const data = await client.list(
    {
      'max-keys': 10,
      prefix: 'test/',
    },
    {}
  );
  return data.objects.slice(1);
}

async function get(item: any) {
  const result = await client.get(item.name);
  return result.content.toString('utf-8');
}

export { list, get };
