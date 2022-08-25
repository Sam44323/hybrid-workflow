const imageFetcher = async (req: any, res: any) => {
  const url = decodeURIComponent(req.query.url);
  const result = await fetch(url);
  const body = result.body;
  (body as any)!.pipe(res);
};

export default imageFetcher;
