export interface UserData {
    display_name:  string;
    external_urls: ExternalUrls;
    followers:     Followers;
    href:          string;
    id:            string;
    images:        Image[];
    type:          string;
    uri:           string;
    access_token:  string;
}

interface ExternalUrls {
    spotify: string;
}

interface Followers {
    href:  null;
    total: number;
}

interface Image {
    height: null;
    url:    string;
    width:  null;
}