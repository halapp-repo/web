const AddressMap = () => {
  return (
    <div className="google-map-code">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3007.4858566798134!2d29.007740514518787!3d41.08022992294456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x936a3fe30ca86ddc!2zNDHCsDA0JzQ4LjgiTiAyOcKwMDAnMzUuOCJF!5e0!3m2!1str!2str!4v1666642934492!5m2!1str!2str"
        width="100%"
        height="300"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
};
export { AddressMap };
